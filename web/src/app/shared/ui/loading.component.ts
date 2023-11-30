import { Component, ContentChild, ElementRef, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    standalone: true,
    selector: 'app-loader',
    template: `
    <mat-spinner [diameter]="120" />
        <ng-content />
        @if (text) {
        <p > {{ text }}</p>
            
        }    
    `,
    styles: `
        :host {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 2rem 0;
            font-size: 2rem;
        }

        mat-spinner + p {
            margin-top: 2rem;
        }
    `,
    imports: [MatProgressSpinnerModule]
})
export class LoadingComponent {
    @Input() text = ''
}