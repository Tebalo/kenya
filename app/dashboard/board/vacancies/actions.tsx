export async function getVacancies() {
    try {
      const response = await fetch('http://172.236.179.13:8080/api/governance/vacancy-list/?reg_status=new&count=10');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data); // Debug log
      return data.vacancies;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }