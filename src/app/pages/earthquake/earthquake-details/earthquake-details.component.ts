import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Feature } from 'src/app/models/feature.model';
import { FeatureService } from 'src/app/services/feature.service';
import { calculateMagnitudeColor, convertMagnitudeType } from 'src/app/utils';
@Component({
  selector: 'app-earthquake-details',
  templateUrl: './earthquake-details.component.html',
  styleUrls: ['./earthquake-details.component.css'],
})
export class EarthquakeDetailsComponent implements OnDestroy {
  subscription!: Subscription;
  feature?: Feature;
  exitsComments: boolean = false;
  bodyComment: string = '';
  featureId!: string;
  currentPage: number = 1;

event: any;
  constructor(
    private rooter: ActivatedRoute,
    private featureSrv: FeatureService
  ) {
    this.featureId = this.rooter.snapshot.params['id'] || '';
    this.subscription = this.getFeature();
    this.currentPage = this.featureSrv.currentPage;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateMagnitudeColor(magnitude: number = 0): string {
    return calculateMagnitudeColor(magnitude) || '';
  }
  convertMagnitudeType(magType: string = '') {
    return convertMagnitudeType(magType);
  }

  addCommentFeature(id: string = '') {
    const newComment = {
      feature_id: id,
      body: this.bodyComment
    };
    
    this.subscription = this.featureSrv.addComment(newComment).subscribe(data => {
      this.subscription = this.getFeature();
      this.bodyComment = "";
    });
    
  }

  getFeature() : Subscription {
    return this.featureSrv
      .getFeature(this.featureId)
      .subscribe((data) => {
        const {
          attributes: { external_id, mag_type, ...attributes },
          links: { external_url },
          ...others
        } = data;
        let newComments: Comment[] = [];

        if ('comments' in attributes && attributes.comments != null) {
          this.exitsComments = true;
          newComments = attributes?.comments.map((x: any) => {
            const newComment: Comment = {
              body: x.body,
              createdAt: x.created_at,
            };
            return newComment;
          });
        }

        const newFeature: Feature = {
          ...others,
          attributes: {
            ...attributes,
            externalId: external_id,
            magType: mag_type,
            comments: newComments,
          },
          links: {
            externalUrl: external_url,
          },
        };
        this.feature = newFeature;
      });
  }
  resultModeDark() : boolean {
    return this.featureSrv.modeDark
  }
}
