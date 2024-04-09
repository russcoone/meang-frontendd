import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';
import { ApiService } from '@graphql/service/api.service';
import {
  ADD_TAG,
  BLOCK_TAG,
  MODIFY_TAG,
} from '@graphql/operations/mutations/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }
  add(tag: string) {
    return this.set(
      ADD_TAG,
      {
        tag,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.addTag;
      })
    );
  }
  update(id: string, tag: string) {
    return this.set(
      MODIFY_TAG,
      {
        id,
        tag,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.updateTag;
      })
    );
  }

  block(id: string) {
    return this.set(
      BLOCK_TAG,
      {
        id,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.blockTag;
      })
    );
  }
}
