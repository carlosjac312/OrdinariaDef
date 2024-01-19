export type getCountryfromPhone = {
    country: string;
  };

const getCountry = async (phone: string): Promise<getCountryfromPhone> => {
    try {
        const url= "https://api.api-ninjas.com/v1/validatephone?number="+phone;
        const response = await fetch(url,{
        headers:{
            'X-Api-Key': 'woAbEJKgkh3OUyTOtSDtaw==dl7GWvZrfYajkd1u'
        }});
        if(response.status !== 200){
        throw new Error("Invalid phone number")
        }
        const pais = await response.json();
        return {country: pais["country"]};
    } catch (error) {
        throw new error
    }
};

export default getCountry;