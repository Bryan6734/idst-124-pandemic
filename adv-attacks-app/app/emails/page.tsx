import { Emails } from '@/components/bryan-ui/Emails';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emails - P-25 Information Center',
  description: 'Email correspondence detailing experiences with the P-25 outbreak.',
};

export default function EmailsPage() {
  return <Emails />;
}
