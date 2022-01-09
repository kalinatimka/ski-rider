import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Output()
  public selectedFile: EventEmitter<File> = new EventEmitter<File>();

  public imgUrl;

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectImageChange(event) {
    if (event.target.files) {
      this.selectedFile.emit(event.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgUrl = event.target.result;
      }
    }
  }
}
