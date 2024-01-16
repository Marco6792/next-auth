import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		/* check if user exist in the data-base? */
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ message: "user does't exist" }, { status: 400 });
		}

		/* check if password is correct */
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json({ error: "Invalid password" }, { status: 400 });
		}
		/* create and asign token */
		const tokenData = {
			id: user._id,
			username: user.username,
		};
		const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN!, { expiresIn: "1d" });

		const response = NextResponse.json({ message: "Login successfully", success: true });
		response.cookies.set("token", token, {
			httpOnly: true,
			maxAge: 30 * 60 * 60,
			sameSite: true,
			secure: true,
			priority: "high",
		});
		return response;
	} catch (error: any) {
		console.log("Error here");
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
