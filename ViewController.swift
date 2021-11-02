//
//  ViewController.swift
//  twqwe
//
//  Created by aa on 2021/11/2.
//  Copyright © 2021 aa. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    let dic = ["🍌":"banana"]
    var english = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("hello")
        // Do any additional setup after loading the view.
    }
    @IBAction func clickAndAlert(sender:UIButton){
        english = dic[sender.titleLabel?.text as! String] ?? 
        
        let myAlert = UIAlertController(title: "title", message: english, preferredStyle: UIAlertController.Style.alert)
        
        let OKbtn = UIAlertAction(title: "ok", style: .default, handler: nil)
        
        myAlert.addAction(OKbtn)
        
        present(myAlert, animated: true)
    }
}

