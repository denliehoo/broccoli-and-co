import axios, { AxiosError } from 'axios';

class ApiRequest {
  static async post(url: string, params?: unknown, signal?: AbortSignal) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      // Use provided signal by API call if available
      const response = await axios.post(url, params, {
        signal: signal || controller.signal,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request was aborted due to timeout');
        } else if (error.response) {
          console.error(
            `API Error: ${error.response.status} - ${error.response.statusText}`,
          );
          console.error('Response Data:', error.response.data);
        } else {
          console.error('Axios error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
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
