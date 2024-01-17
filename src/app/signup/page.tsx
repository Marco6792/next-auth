"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React, { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShapeContainer, ShapeContent, clipPath } from "@/components/ui/shapes";
import { Toaster, toast } from "sonner";
import { ArrowRightCircle, ArrowRightIcon, ChevronRight } from "lucide-react";

type UserType = {
	username: string;
	email: string;
	password: string;
};
export default function SignUpPage() {
	const router = useRouter();

	const [user, setUser] = React.useState<UserType>({
		username: "",
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

	const onSignUp = async () => {
		try {
			setLoading(true);
			const responds = await axios.post("/api/users/signup", user);
			console.log("signup success", responds.data);
			const { savedUser } = responds.data;
			toast.success(`${savedUser.username} created successfully!`);
			router.push(`/login`);
		} catch (error: any) {
			console.log("signup error", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);
	return (
		<div className="mt-14 p-4">
			<div className="flex space-x-3 mx-auto max-w-md pb-4 items-center">
				<Link href={"/"} className="text-xl hover:text-slate-300">
					Home
				</Link>
				<ChevronRight />
				<p className="dark:text-slate-300">signup</p>
			</div>
			<span className="absolute -translate-x-96">{loading && toast.loading("loading...")}</span>
			<Card className="p-5 max-w-md mx-auto ">
				<Toaster duration={2000} richColors position="top-center" />
				<ShapeContainer>
					<ShapeContent
						style={{ clipPath: clipPath.clipPathTwo }}
						className="md:w-[26.125rem]"></ShapeContent>
				</ShapeContainer>
				<CardTitle className="pb-14 text-center">Sign Up</CardTitle>
				<CardContent className="flex flex-col space-y-5">
					<div>
						<Label>username:</Label>
						<Input
							name="username"
							value={user.username}
							placeholder="enter username"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<Label>email:</Label>
						<Input
							name="email"
							value={user.email}
							placeholder="enter email"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<Label>password:</Label>
						<Input
							name="password"
							value={user.password}
							placeholder="enter password"
							onChange={handleChangeInput}
						/>
					</div>
					{/* <div>
					<Input type="checkbox" className="w-4 accent-blue-600" />
					<p>accept to our terms and condition</p>
				</div> */}
					<Button disabled={buttonDisabled} className={``} onClick={onSignUp}>
						{loading ? "processing..." : "signup"}
					</Button>
					<CardFooter className="text-slate-400 p-2">
						{" "}
						<span>
							already have an account ?{" "}
							<Link href={"/login"} className="text-blue-600 hover:underline">
								login
							</Link>
						</span>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	);
}
