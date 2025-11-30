import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish, DishRequest } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:8080/api/dishes';

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  getDishesByCook(cookId: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/cook/${cookId}`);
  }

  createDish(dish: DishRequest): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: number, dish: DishRequest): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
