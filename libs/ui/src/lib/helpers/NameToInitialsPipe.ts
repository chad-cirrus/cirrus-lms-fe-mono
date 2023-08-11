import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nameToInitials"
})
export class NameToInitialsPipe implements PipeTransform {
  transform(fullName: string): any {
    return fullName
      .split(" ")
      .map(n => n[0])
      .join("");
  }
}