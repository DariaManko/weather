import { z } from 'zod';

// Tag schema
const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Category schema
const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Pet schema
export const PetSchema = z.object({
  id: z.number(),
  category: CategorySchema,
  name: z.string(),
  photoUrls: z.array(z.string().url()),
  tags: z.array(TagSchema),
  status: z.enum(['available', 'pending', 'sold']),
});

// Export types for use in tests
export type Pet = z.infer<typeof PetSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Tag = z.infer<typeof TagSchema>;

// Validator function
export function validatePet(data: unknown): Pet {
  const pet = PetSchema.parse(data);
  console.log(`✓ Pet validated successfully: ID=${pet.id}, Name="${pet.name}", Status="${pet.status}"`);
  return pet;
}
