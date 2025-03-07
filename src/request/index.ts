import axios, { AxiosError } from 'axios';

// TODO: Figure out why this doesnt work when we have error
class ApiRequest {
  static async post(url: string, params?: unknown) {
    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      console.log('Sending request to:', url);
      console.log('Request payload:', params);

      const response = await axios.post(url, params, {
        signal: controller.signal,
      });

      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        console.error('Request was aborted');
      } else {
        console.error('Error:', error);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export default ApiRequest;

interface IApiError {
  errorMessage: string;
}

// Assuming that the error response from the API is always in the format of IApiError
export type TApiError = AxiosError<IApiError>;

export const getApiErrorMessage = (error: unknown) => {
  const axiosError = error as TApiError;
  return axiosError.response?.data?.errorMessage ?? 'Unknown error';
};
