import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		/* @getting data from the user(frontend) */
		const reqBody = await request.json();
		const { username, email, password } = reqBody;

		/* @check if user already exit! */
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json({ message: "user already exit" }, { status: 500 });
		}

		/* @hash password (***bcryptjs) */
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		/* @storing new user details into the data-base */
		const newUser = new User({ username, email, password: hashedPassword });

		const savedUser = await newUser.save();
		console.log(savedUser);

		return NextResponse.json({
			message: "user create successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
