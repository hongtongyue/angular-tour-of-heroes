import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero'
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  styleUrls: ['heroes.component.css'],
  templateUrl: 'heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heros: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService, private router: Router) {
  };
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeros(): void {
    this.heroService.getHeroes().then(heroes => this.heros = heroes);
  }
  ngOnInit(): void {
    this.getHeros();
  }
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name)
      .then(hero => {
        this.heros.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heros = this.heros.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}

