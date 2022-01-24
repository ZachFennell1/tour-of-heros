import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from "../hero";
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService, 
    private formBuilder: FormBuilder,
    private messageService: MessageService) 
    { }
  
  newHeroForm = this.formBuilder.group({
    name: ''
  });
  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  newHero: Hero = {id:0, name: ""};
  addHero()
  {
    this.newHero = {id: this.heroes.length + 1, name: this.newHeroForm.get("name")?.value}
    this.heroes.push(this.newHero);
    this.newHeroForm.reset();
  }

  
  clearIt()
  {
    this.heroService.clear();
  }

  saveCurrent()
  {
    this.heroService.saveCurrent(this.heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
