import { Component } from "react";
import { selectionSort } from "../../Algorithm/sortingAlgorithms";
import Pile from "./Pile";

export default class Logger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }
     swap(piles, a, b) {
        const tempVal = piles[a];
        piles[a] = piles[b];
        piles[b] = tempVal;
    }
    selectionSort(piles) {

        let statesInOrder = [];
        for (let i = 0; i < piles.length - 1; i++) {
            let minId = i;
            console.log('Initializing minimum value as ', piles[i])
            for (let j = i + 1; j < piles.length; j++) {
                if (piles[j] < piles[minId]) {
                    minId = j;
                }
                const temp = { piles: piles.slice(), changing: [j] };
                statesInOrder.push(temp);

            }
            this.swap(piles, minId, i);
            // console.log('swap', piles[minId], 'and', piles[i])
            this.setState({
                arr: [...this.state.arr,`swap ${piles[minId]} and ${piles[i]}` ],
                
            });
            const temp = { piles: piles.slice(), changing: [minId, i] };
            statesInOrder.push(temp);
        }
        console.log("The sorted array is:", piles)
        console.log(this.state.arr)
        return statesInOrder;

    }
    componentDidMount() {
        this.selectionSort([1,4,5,2,9])
    }
    render(){
        return(
            <div>
                {this.state.arr.map(element =>(
                    <div>
                        {element}
                    </div>
                ))  }
            </div>

            )
    }
        
    


}