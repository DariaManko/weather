import { APIRequestContext } from '@playwright/test';

export class Pets {
  private readonly request: APIRequestContext;
  private readonly baseURL = 'https://mock.apidog.com/m1/1043361-1030628-default/pets';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Get all pets
   */
  async getPets() {
    const response = await this.request.get(`${this.baseURL}`);
    return response.json();
  }

  /**
   * Get pet by id
   * @param petId - The id of the pet to retrieve
   */
  async getPetById(petId: number) {
    const response = await this.request.get(`${this.baseURL}/${petId}`);
    return response.json();
  }

  /**
   * Create a new pet
   * @param data - The pet data to post
   */
  async postPet(data: any) {
    const response = await this.request.post(`${this.baseURL}`, {
      data: data,
    });
    return response.json();
  }

  /**
   * Delete a pet by id
   * @param petId - The id of the pet to delete
   */
  async deletePet(petId: number) {
    const response = await this.request.delete(`${this.baseURL}/${petId}`);
    return response.json();
  }
}
