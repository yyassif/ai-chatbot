import { login, signup } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-4 mb-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Your password"
              type="password"
            />
          </div>
        </div>
        <Button className="w-full" formAction={login}>
          Login
        </Button>
        <Button className="w-full" formAction={signup}>
          Signup
        </Button>
      </div>
    </form>
  );
}
