export type getHourfromCountry = {
    hour: string;
  };

const getHour = async (country: string): Promise<getHourfromCountry> => {
    const url= "https://api.api-ninjas.com/v1/worldtime?city="+country;
    const response = await fetch(url,{
      headers:{
        'X-Api-Key': 'woAbEJKgkh3OUyTOtSDtaw==dl7GWvZrfYajkd1u'
      }});
    if(response.status !== 200){
      throw new Error("Invalid Country name")
    }
    const hora = await response.json();
      return {hour: hora["hour"]};
};

export default getHour;