import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

const rapidApiKey = '0642bf5081mshe684e639790ae6fp19ca6ejsn920619a77ae1';

const useFetch = ({
  endpoint,
  params
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params,
  };

  const fetchData = async () => {
    if (isLoading)  return;

    try {
      setIsLoading(true);

      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData
  }
};

export default useFetch;