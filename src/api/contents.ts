import { api } from '@/utils/customAxios';

export async function getContents() {
  const result = await api.get('contents');

  return result.data.data;
}

export async function getContentsDetail(contentId: any) {
  const result = await api.get(`contents/${contentId}`);

  return result.data.data;
}
