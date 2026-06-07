import { IMG_URL } from "~/api/constant";

export const getImageUrl = (path?: string) => {
	if (!path) return "";
	if (path.startsWith("http")) return path;
	const filename = path.split(/[/\\]/).pop();
	return `${IMG_URL}${filename}`;
};
