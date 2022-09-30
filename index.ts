import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import ContentApi from './apis/ContentApi';
import * as ContentActions from './actionControllers/ContentController';
import { getLocale } from './utils/Request';

export default {
  'data-sources': {
    'frontastic/content': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentApi = new ContentApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentApi.getContent(config.configuration.entryId),
      };
    },
  },
  actions: {
    content: ContentActions,
  },
} as ExtensionRegistry;
