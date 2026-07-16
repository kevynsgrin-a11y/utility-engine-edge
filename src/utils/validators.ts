import { z } from 'zod';

export const PersonSchema = z.object({
  name: z.string().min(1).max(50),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  geoLat: z.number().min(-90).max(90).optional(),
  geoLng: z.number().min(-180).max(180).optional(),
});

export const AuraMatchInputSchema = z.object({
  personA: PersonSchema,
  personB: PersonSchema,
});
export type AuraMatchInput = z.infer<typeof AuraMatchInputSchema>;

export const SaasToolSchema = z.object({
  toolName: z.string().min(1),
  category: z.enum(['crm', 'hosting', 'marketing', 'design', 'analytics', 'productivity', 'other']),
  monthlySpendUsd: z.number().nonnegative(),
  seats: z.number().int().positive().default(1),
});

export const StackTrimInputSchema = z.object({
  companySize: z.enum(['1-10', '11-50', '51-200', '200+']),
  tools: z.array(SaasToolSchema).min(1).max(100),
});
export type StackTrimInput = z.infer<typeof StackTrimInputSchema>;
