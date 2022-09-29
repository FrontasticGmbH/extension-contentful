import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import ContentApi from './apis/ContentApi';
import * as ContentActions from './actionControllers/ContentController';
import { getLocale } from './utils/Request';

export default {
  'data-sources': {
    'frontastic/content-list': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentApi = new ContentApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentApi.getEntries(),
      };
    },
    'frontastic/content': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentApi = new ContentApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentApi.getEntry(config.configuration.entryId),
      };
    },
    'frontastic/asset-list': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentApi = new ContentApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentApi.getAssets(),
      };
    },
    'frontastic/asset': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const clientConfig = context.frontasticContext?.project.configuration.contentful;

      const contentApi = new ContentApi(
        { space: clientConfig.spaceId, accessToken: clientConfig.accessToken },
        getLocale(context.request),
      );

      return {
        dataSourcePayload: await contentApi.getAsset(config.configuration.assetId),
      };
    },
  },
  actions: {
    content: ContentActions,
  },
} as ExtensionRegistry;
