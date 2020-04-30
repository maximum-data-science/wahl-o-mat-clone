import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: String = 'Wahl-O-Mat clone (Europawahl 2019)';
  items: any;
  /* 2017 */
  /*  parties: string[] = ["spd", "cdu", "gruene", "linke", "afd", "fdp", "piraten", "npd","freie","tierschutz", "oedp", "partei", "bayern", "volksabstimmung", "pdv", "mlpd"];
  */
  /* 2019 */
  parties: string[] = ["cdu", "spd", "gruene", "linke", "partei", "volksabstimmung",
    "bayern", "dkp", "demokratie", "III", "grauen", "rechte", "violette", "liebe", "frauen",
    "panter", "lkr", "welt", "liberale", "oeko", "humanisten", "tiere", "gesundsforschung", "volt"];


  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get("assets/positions_2019.json").subscribe(data => {
      // Read the result field from the JSON response.
      this.items = data;
    });
  }
  getMatches(items: any): any {
    let partyScore = new Map<string, number>();

    if (items == null) {
      return [];
    }

    for (let item of items) {
      for (let party of this.parties) {
        let oldScore: number = this.getDefaultScore(partyScore.get(party));
        let points: number = this.getPoints(item.answer, item[party]);
        partyScore.set(party, oldScore + points);
      }
    }

    return this.qualify(partyScore, items.length * 2);
  }
  getDefaultScore(oldScore: number): number {
    return oldScore == null ? 0 : oldScore;
  }
  getPoints(userPosition: string = " ", partiesPosition: string) {
    let partyUser = [];
    partyUser["/"] = [];
    partyUser["/"]["/"] = 2;
    partyUser["/"]["-"] = 1;
    partyUser["/"]["x"] = 0;
    partyUser["/"][" "] = 0;

    partyUser["-"] = [];
    partyUser["-"]["/"] = 1;
    partyUser["-"]["-"] = 2;
    partyUser["-"]["x"] = 1;
    partyUser["-"][" "] = 0;

    partyUser["x"] = [];
    partyUser["x"]["/"] = 0;
    partyUser["x"]["-"] = 1;
    partyUser["x"]["x"] = 2;
    partyUser["x"][" "] = 0;

    return partyUser[partiesPosition][userPosition];
  }
  qualify(scores: Map<string, number>, maxPoints: number): any {
    let result: any = [];
    scores.forEach((value: number, key: string) => {
      result.push({ name: key.toUpperCase(), percentage: Math.round(value / maxPoints * 1000) / 10 });
    });
    return result.sort((m1, m2) => m2.percentage - m1.percentage);
  }
}
