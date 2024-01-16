import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
	return (
		<Card className="max-w-md mx-auto mt-10 p-6">
			<CardTitle className="p-4">Profile</CardTitle>
			<CardContent
				className="flex flex-col space-y-4
       pt-5">
				<p className="text-foreground">username: {"undifined"}</p>
				<p className="text-foreground">email: {"undifined"}</p>
			</CardContent>
		</Card>
	);
}
