import UIKit

let ans = Int.random(in:1..<100)
var n = 0
var result = true
while(result){
    n = Int.random(in:1..<100)
    if(n != ans){
        
//        print(n)
        continue
    }
    else if(n == ans){
        print("correct")
        result = true
    }
}
