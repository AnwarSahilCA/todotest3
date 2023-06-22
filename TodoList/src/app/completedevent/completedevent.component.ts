import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Events } from '../model/Event';
import { RouterServiceService } from '../service/router-service.service';

@Component({
  selector: 'app-completedevent',
  templateUrl: './completedevent.component.html',
  styleUrls: ['./completedevent.component.css']
})
export class CompletedeventComponent implements OnInit {
  constructor(private service:ServiceService,private router:RouterServiceService){}
  events:Events[]=[];
  ngOnInit(){
    this.events=this.getCompletedP();
  }
  getCompletedP():any{
    this.service.getCompleted().subscribe((event)=>{
    
      this.events=event;
      this.service.progress=this.events.length;
    this.service.total+=this.events.length;
    console.log(this.service.progress);
    })
  }
 


toCompleted(){
  console.log(this.service.total);
  this.router.tocomplete();
}
toPending(){
  this.router.topending();
}



}
