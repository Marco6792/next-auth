import { cn } from "@/lib/utils";
import * as React from "react";

const ShapeContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"blur-3xl fixed md:ml-[18rem] max-w-lg max-sm:overflow-hidden max-sm:-mt-20 -z-40",
				className,
			)}
			{...props}
		/>
	),
);

ShapeContainer.displayName = "ShapeContainer";

export const clipPath = {
	clipPathOne:
		"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",

	clipPathTwo:
		"polygon(100.00% 50.00%,90.45% 79.39%,65.45% 97.55%,34.55% 97.55%,9.55% 79.39%,0.00% 50.00%,9.55% 20.61%,34.55% 2.45%,65.45% 2.45%,90.45% 20.61%,100.00% 50.00%,calc(90.45% - 42.88px) calc(20.61% - -31.15px),calc(65.45% - 16.38px) calc(2.45% - -50.41px),calc(34.55% - -16.38px) calc(2.45% - -50.41px),calc(9.55% - -42.88px) calc(20.61% - -31.15px),calc(0.00% - -53.00px) calc(50.00% - 0.00px),calc(9.55% - -42.88px) calc(79.39% - 31.15px),calc(34.55% - -16.38px) calc(97.55% - 50.41px),calc(65.45% - 16.38px) calc(97.55% - 50.41px),calc(90.45% - 42.88px) calc(79.39% - 31.15px),calc(100.00% - 53.00px) calc(50.00% - 0.00px),calc(90.45% - 42.88px) calc(20.61% - -31.15px))",

	clipPathThree: "clip-path: polygon(25.00% 93.30%,25.00% 6.70%,100.00% 50.00%)",

	clipPathFive:
		" polygon(92.06% 77.03%,70.77% 95.48%,42.88% 99.49%,17.26% 87.79%,2.03% 64.09%,2.03% 35.91%,17.26% 12.21%,42.88% 0.51%,70.77% 4.52%,92.06% 22.97%,100.00% 50.00%)",
};

const ShapeContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ clipPath, className, ...props }: string & any, ref) => (
		<div
			ref={ref}
			className={cn(
				" aspect-[1155/678] max-sm:w-[15.125rem] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] relative -z-10 dark:from-blue-400 dark:to-blue-600",
				className,
			)}
			{...props}
			style={{
				clipPath: clipPath,
			}}
		/>
	),
);

ShapeContent.displayName = "ShapeContent";

export { ShapeContainer, ShapeContent };
