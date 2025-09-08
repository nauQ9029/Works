//contain process Prime number code
const isPrime = (numInput) =>{
    if(numInput<2){
        return false;
    }else{
        for(let i=2; i<numInput;i++){
            if(numInput%i==0){
                return false;
            }
        }
        return true;
    }
}
//C1
//module.exports = isPrime;
//C2 khi có nhiều function
module.exports={
    isPrime
};

