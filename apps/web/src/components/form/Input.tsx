import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return <input {...props} className="rounded bg-zinc-900 py-3 px-4 text-sm placeholder:text-zinc-500" />;
}
