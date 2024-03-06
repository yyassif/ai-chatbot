import { createClient } from '@/lib/supabase/server'
import { nanoid } from '@/lib/utils'
import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL as string,
  apiKey: 'ollama'
})

export async function POST(req: Request) {
  const body = await req.json()
  const { messages } = body

  try {
    const supabase = createClient()
    const {
      data: { session }
    } = await supabase.auth.getSession()
    const userId = session?.user?.id as string

    console.log('userId', userId)

    if (!process.env.OLLAMA_MODEL_NAME) {
      return new Response('OLLAMA_MODEL_NAME is not set', {
        status: 500
      })
    }

    if (!userId) {
      return new Response('Unauthorized', {
        status: 401
      })
    }

    const res = await openai.chat.completions.create({
      model: process.env.OLLAMA_MODEL_NAME as string,
      messages,
      temperature: 0.7,
      stream: true
    })

    console.log('res', res)

    const stream = OpenAIStream(res, {
      async onCompletion(completion) {
        const title = body.messages[0].content.substring(0, 100)
        const id = body.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
        await kv.hmset(`chat:${id}`, payload)
        await kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      }
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('error', error)
    return new Response('Internal Server Error', {
      status: 500
    })
  }
}
