import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.21.4/+esm';

/**
 * Zod Schema Definitions
 */

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(3, "Subject is required (min 3 chars)"),
    message: z.string().min(10, "Message must be at least 10 characters long").max(1000, "Message is too long (max 1000 chars)")
});

export const reportSchema = z.object({
    petType: z.string().nonempty("Please select a pet type"),
    petName: z.string().optional(),
    gender: z.string().optional(),
    color: z.string().optional(),
    location: z.string().min(5, "Please provide a specific location (at least 5 chars)"),
    situation: z.string().nonempty("Please select a situation type"),
    condition: z.string().optional(),
    urgency: z.string().nonempty("Please select an urgency level"),
    details: z.string().optional(),
    photos: z.any().optional() // File validation is tricky with simple Zod objects, handle separately or use custom refinement
}).superRefine((data, ctx) => {
    // Conditional Validation: Emergency requires more details
    if (data.urgency === "emergency" && (!data.details || data.details.length < 10)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "For emergencies, please provide at least 10 characters of details.",
            path: ["details"]
        });
    }
});
