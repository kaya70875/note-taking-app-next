import { Note } from "../types/notes";
import axios from "axios";
import useSWR from "swr";

interface NotesResponse {
    notes: Note[];
}

const fetcher = async () => {
    const response = await axios.get<NotesResponse>('/api/getData');
    return response.data;
}

const useFetch = () => {
    const { data, error, isValidating } = useSWR<NotesResponse>('/api/getData', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    });

    return {
        data: data?.notes || [], // This will give an array of notes or an empty array
        loading: isValidating,
        error: error ? error.message : '',
    };
};

export default useFetch;
