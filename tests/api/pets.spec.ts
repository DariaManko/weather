import { test, expect } from '../../fixtures';
import petData from '../../src/test-data/pet.json';
import { validatePet, PetSchema } from '../../src/API/pets.contract';
import { z } from 'zod';

test.describe('API - Pets - CRUD requests', () => {

	test('GET all pets', async ({ petsAPI }) => {
		const res = await petsAPI.getPets();
		expect(Array.isArray(res)).toBeTruthy();
		
		const petsArraySchema = z.array(PetSchema);
		const validated = petsArraySchema.parse(res);
		expect(validated.length).toBeGreaterThan(0);
	});

	test('POST create pet (from test-data)', async ({ petsAPI }) => {
		const created = await petsAPI.postPet(petData);
		expect(typeof created.id).toBe('number');
		expect(created.id).toBeGreaterThan(0);
	});

	test('GET pet by id', async ({ petsAPI }) => {
		const petId = petData.id;
		const response = await petsAPI.getPetById(petId);
		validatePet(response);
	});

	test('DELETE pet by id', async ({ petsAPI }) => {
		const petId = petData.id;
		const del = await petsAPI.deletePet(petId);
		expect(del).toBeTruthy();
	});

});