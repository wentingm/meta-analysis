  # Code

  ## Paper Search
  ```
  ///////////////////////////////// Untested /////////////////////////////////
  const [results, setResults] = useState(null)
  const API_URL = "http://127.0.0.1:8000/api/papers/search?";

  const handleSearch = async () => {
    setSearchStatus("loading");

    // Construct search query
    const query = "machine learning"; // Replace with actual user input if needed
    const yearFilter = `${yearRange[0]}-${yearRange[1]}`;

    try {
      const uri = `${API_URL}?query=${encodeURIComponent(query)}&year=${yearFilter}`
      console.log(uri) // Testing output
      const response = await fetch(uri);
      const data = await response.json();

      setResults(data);
      setSearchStatus("success");
    } catch (error) {
      console.error("Search failed:", error);
      setSearchStatus("error");
    }
  };

  ///////////////////////////////// Untested /////////////////////////////////
  ```