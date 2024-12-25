import { supabase } from "@/integrations/supabase/client";
import { MoniteService } from "./monite";

interface CreateEntityData {
  name: string;
  email: string;
}

export class MoniteEntityService {
  static async createEntity(data: CreateEntityData) {
    console.log('Creating new Monite entity:', data);

    try {
      // 1. Create entity in Monite
      const moniteResponse = await MoniteService.makeRequest({
        path: '/entities',
        method: 'POST',
        body: {
          type: "organization",
          organization: {
            legal_name: data.name,
            contacts: [{
              email: data.email,
              type: "business"
            }]
          }
        }
      });

      console.log('Monite entity created:', moniteResponse);

      // 2. Store entity in our database
      const { data: entity, error: entityError } = await supabase
        .from('entities')
        .insert({
          name: data.name,
          monite_entity_id: moniteResponse.id,
          status: 'active'
        })
        .select()
        .single();

      if (entityError) {
        console.error('Error storing entity:', entityError);
        throw entityError;
      }

      // 3. Create Monite settings
      const { error: settingsError } = await supabase
        .from('monite_settings')
        .insert({
          entity_id: moniteResponse.id,
          api_key: moniteResponse.api_key, // Monite should return this
          environment: 'sandbox'
        });

      if (settingsError) {
        console.error('Error storing Monite settings:', settingsError);
        throw settingsError;
      }

      return entity;
    } catch (error) {
      console.error('Error in createEntity:', error);
      throw error;
    }
  }
}