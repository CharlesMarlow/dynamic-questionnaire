import { useEffect, useState } from 'react';
import axios from 'axios';
import { Schema } from '../types';
import { API_URL } from '../constants';

const useSchema = () => {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [schemaError, setSchemaError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axios.get<Schema>(`${API_URL}/schema`);
        setSchema(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSchemaError(err.message);
          console.error('Error fetching schema:', err.message);
        } else {
          setSchemaError('An unexpected error occurred. Please try again later');
          console.error('Error fetching schema:', err);
        }
      }
    };
    fetchSchema();
  }, []);

  return { schema, schemaError };
};

export default useSchema;
