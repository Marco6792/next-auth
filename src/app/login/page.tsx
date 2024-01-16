"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShapeContainer, ShapeContent, clipPath } from "@/components/ui/shapes";
import { ChevronRight } from "lucide-react";
import { Toaster, toast } from "sonner";

type UserType = {
	email: string;
	password: string;
};
export default function SignUpPage() {
	const router = useRouter();

	const [user, setUser] = React.useState<UserType>({
		email: "",
		password: "",
	});

	const [loading, setLoading] = React.useState<boolean>(false);

	const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const name = e.target.name;
		setUser({ ...user, [name]: value });
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	const onLogin = async () => {
		try {
			setLoading(true);
			const res = await axios.post("/api/users/login", user);
			toast.success("login successfully");
			router.push("/");
		} catch (error: any) {
			console.log("login failed");
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-14 p-4">
			<Toaster richColors />
			<span className="absolute -translate-x-96">{loading && toast.loading("loading...")}</span>
			<div className="flex space-x-3 mx-auto max-w-md pb-4 items-center">
				<Link href={"/"} className="text-2xl hover:text-slate-300">
					Home
				</Link>
				<Link href={"/signup"} className="text-xl hover:text-slate-300">
					{" "}
					signup
				</Link>
				<ChevronRight />
				<p className="dark:text-slate-300">login</p>
			</div>
			<Card className="p-5 max-w-md mx-auto">
				<ShapeContainer className="">
					<ShapeContent
						style={{ clipPath: clipPath.clipPathTwo }}
						className="md:w-[26.125rem]"></ShapeContent>
				</ShapeContainer>
				<CardTitle className="pb-10 co">LogIn</CardTitle>
				<CardContent className="flex flex-col space-y-5">
					<div>
						<Label>email:</Label>
						<Input
							name="email"
							placeholder="enter email"
							onChange={handleChangeInput}
							value={user.email}
						/>
					</div>
					<div>
						<Label>password:</Label>
						<Input
							name="password"
							placeholder="enter password"
							onChange={handleChangeInput}
							value={user.password}
						/>
					</div>
					<Button disabled={buttonDisabled} className={``} onClick={onLogin}>
						{loading ? "processing..." : "login"}
					</Button>
					<CardFooter className="text-slate-400 p-2">
						<span>
							don't have an account ? {""}
							<Link href={"/signup"} className="text-blue-600">
								signup
							</Link>
						</span>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	);
}
