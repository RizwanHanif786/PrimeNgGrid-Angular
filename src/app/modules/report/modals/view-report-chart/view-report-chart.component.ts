import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportDataService } from '../../service/report-data.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-view-report-chart',
  templateUrl: './view-report-chart.component.html',
  styleUrls: ['./view-report-chart.component.scss']
})
export class ViewReportChartComponent implements OnInit {
  rowData: any;
  basicOptions!: { plugins: { legend: { labels: { color: string; }; }; }; scales: { x: { ticks: { color: string; }; grid: { color: string; }; }; y: { ticks: { color: string; }; grid: { color: string; }; }; }; };
  basicData!: { labels: string[]; datasets: { label: string; backgroundColor: string; data: number[]; }[]; };
 
 
  constructor(public dialogRef: DynamicDialogRef, 
    private reportDataService: ReportDataService, 
    public config: DynamicDialogConfig) {
    this.applyLightTheme()   
 
  }

  ngOnInit(): void {
    this.getRowsData();
  }
  
  getRowsData() {
    this.reportDataService.getProducts().then((data:Product[]) => {
      if(data) {
      this.rowData = data
      this.basicData = {
        labels: this.rowData.map((product:Product) => product.name),
        datasets: [
            {
                label: 'Price',
                backgroundColor: '#42A5F5',
                data: this.rowData.map((product:Product) => product.price)
            },
            {
                label: 'Quantity',
                backgroundColor: '#FFA726',
                data: this.rowData.map((product:Product) => product.quantity)
            }
        ]
    };
  }
    });
   
  }

  applyLightTheme() {
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
  }




   /**
   * closes confimation model && return false
   */
    decline() {
      this.dialogRef?.close(false);
    }
  

}
