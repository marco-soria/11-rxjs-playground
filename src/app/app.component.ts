import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button: ${this.clickCount()} times`);
    // });
    //toObservable(this.clickCount)
  }

  ngOnInit(): void {
    // // Update the current time every second
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // // Clean up the subscription when the component is destroyed
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    //   //console.log('Subscription cleaned up');
    // });

    //setInterval(() => {
    //   this.clickCount.update((count) => count + 1);
    // }, 1000);
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button: ${this.clickCount()} times`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((count) => count + 1);
  }
}
