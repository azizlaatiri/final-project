const initialdata={
    cars:[]
}
export const CarsReducer=(state=initialdata,action)=>{
    switch(action.type){
        case'get_all_cars':{
            return{
                ...state,
                cars: action.payload
            }
        }
        default:return state
    }
}