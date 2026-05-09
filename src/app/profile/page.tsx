import { PageDescription } from "../../components/PageDescription";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageDescription />
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Full name</label>
                <Input placeholder="Natalia Kowalska" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input placeholder="natalia@gmail.com" type="email" />
              </div>
            </div>
            <div className="mt-4">
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>Use a strong password you don't use anywhere else</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Current password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">New password</label>
                <Input type="password" />
                <p className="text-[0.8rem] text-zinc-500 dark:text-zinc-400">At least 8 characters</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Confirm new password</label>
                <Input type="password" />
              </div>
            </div>
            <div className="mt-4">
              <Button>Update password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
