import { z } from "zod";

const categorySchema = z.object({
	name: z.string().min(5, "Title must be at least 5 characters"),
	description: z.string().optional(),
	slug: z.string().optional(),
});

export default categorySchema;
