import axios from "axios";

class PointlessEndpoint{
    static BASE_URL = "https://api.coingecko.com/api/v3"

    static async price () {
        try{
            const response = await axios.get(`${PointlessEndpoint.BASE_URL}/simple/price?ids=bitcoin,dogecoin,ethereum&vs_currencies=usd`)
            console.log("successful",response)
            return response;
        }
        catch (err){
            console.log("unsuccessful")
            throw err;
        }
    }
}
export default PointlessEndpoint;