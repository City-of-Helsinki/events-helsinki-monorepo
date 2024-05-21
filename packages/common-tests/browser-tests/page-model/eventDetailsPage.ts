import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';

class EventDetailsPage {
  private get title() {
    return screen.getByTestId('event-name');
  }

  private get returnButton() {
    const returnButtonText = i18n.t('event:hero.ariaLabelBackButton');
    return screen.findByRole('link', {
      name: returnButtonText,
    });
  }

  private get description() {
    const descriptionHeading = i18n.t('event:description.title');
    return screen.findByRole('heading', {
      name: descriptionHeading,
    });
  }

  /** Note: not always available */
  private get similarEventsTitle() {
    const similarEventsHeading = i18n.t('event:similarEvents.title');
    return screen.findByRole('heading', {
      name: similarEventsHeading,
    });
  }

  private get dateInfo() {
    const dateLabel = i18n.t('event:info.labelDateAndTime');
    return screen.findByRole('heading', {
      name: dateLabel,
    });
  }

  private get publisherInfo() {
    const publisherLabel = i18n.t('event:info.labelPublisher');
    return screen.findByRole('heading', {
      name: publisherLabel,
    });
  }

  /** Note: not always available */
  private get map() {
    const mapHeading = i18n.t('common:mapBox.title');
    return screen.findByTitle(mapHeading);
  }

  /** Note: not always available */
  private get locationInfo() {
    const locationLabel = i18n.t('event:info.labelPublisher');
    return screen.findByRole('heading', {
      name: locationLabel,
    });
  }

  /** Note: not always available */
  private get languageInfo() {
    const languageLabel = i18n.t('event:info.labelLanguages');
    return screen.findByRole('heading', {
      name: languageLabel,
    });
  }

  /** Note: not always available */
  private get routeInfo() {
    const directionsLabel = i18n.t('event:info.labelDirections');
    return screen.findByRole('heading', {
      name: directionsLabel,
    });
  }

  /** Note: not always available */
  private get organizerInfo() {
    const organizerLabel = i18n.t('event:info.labelOrganizer');
    return screen.findByRole('heading', {
      name: organizerLabel,
    });
  }

  /** Note: not always available */
  private get audienceInfo() {
    const audienceLabel = i18n.t('event:info.labelAudience');
    return screen.findByRole('heading', {
      name: audienceLabel,
    });
  }

  /** Note: not always available */
  private get superEventInfo() {
    const superEventHeading = i18n.t('event:superEvent.title');
    return screen.findByRole('heading', {
      name: superEventHeading,
    });
  }

  /** Note: not always available */
  private get subEventInfo() {
    const subEventsHeading = i18n.t('event:subEvents.title');
    return screen.findByRole('heading', {
      name: subEventsHeading,
    });
  }

  public async clickReturnButton() {
    await t.click(this.returnButton);
  }

  public async verifyBasicContent() {
    // eslint-disable-next-line no-console
    console.info('EventDetailsPage: verify');
    await t.expect(this.returnButton.exists).ok();
    await t.expect(this.title.exists).ok();
    await t.expect(this.description.exists).ok();
    await t.expect(this.dateInfo.exists).ok();
    await t.expect(this.publisherInfo.exists).ok();
  }

  public async verifyLocationContent() {
    await t.expect(this.locationInfo.exists).ok();
    await t.expect(this.routeInfo.exists).ok();
  }

  public async verifyServiceMap() {
    await t.expect(this.map.exists).ok();
  }

  public async verifyLanguageContent() {
    await t.expect(this.languageInfo.exists).ok();
  }

  public async verifyaudienceContent() {
    await t.expect(this.audienceInfo.exists).ok();
  }

  public async verifyOrganizerContent() {
    await t.expect(this.organizerInfo.exists).ok();
  }

  public async verifySimilarEventsContent() {
    await t.expect(this.similarEventsTitle.exists).ok();
  }

  public async verifySuperEventsContent() {
    await t.expect(this.superEventInfo.exists).ok();
  }

  public async verifySubEventsContent() {
    await t.expect(this.subEventInfo.exists).ok();
  }
}

export { EventDetailsPage };
