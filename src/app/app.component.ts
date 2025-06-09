import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Update the current time every second
    const subscription = interval(1000)
      .pipe(map((val) => val * 2))
      .subscribe({
        next: (val) => console.log(val),
      });
    // Clean up the subscription when the component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      //console.log('Subscription cleaned up');
    });
  }
}
