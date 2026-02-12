import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Ruler } from 'lucide-react';
import type { UpperBodyMeasurements, LowerBodyMeasurements } from '../types';
import { useT } from '../../../i18n/useT';

interface MeasurementsSectionProps {
  upperBody: UpperBodyMeasurements;
  lowerBody: LowerBodyMeasurements;
  onChange: (updates: { upperBody?: UpperBodyMeasurements; lowerBody?: LowerBodyMeasurements }) => void;
}

export function MeasurementsSection({ upperBody, lowerBody, onChange }: MeasurementsSectionProps) {
  const { t } = useT();
  
  const updateUpperBody = (field: keyof UpperBodyMeasurements, value: string) => {
    onChange({ upperBody: { ...upperBody, [field]: value } });
  };

  const updateLowerBody = (field: keyof LowerBodyMeasurements, value: string) => {
    onChange({ lowerBody: { ...lowerBody, [field]: value } });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Ruler className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{t('measurements')}</h2>
      </div>
      
      {/* Upper Body */}
      <div className="space-y-4">
        <h3 className="font-semibold text-base text-muted-foreground">{t('upperBodyMeasurements')}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="upper-length">{t('length')}</Label>
            <Input
              id="upper-length"
              value={upperBody.length}
              onChange={(e) => updateUpperBody('length', e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-chest">{t('chest')}</Label>
            <Input
              id="upper-chest"
              value={upperBody.chest}
              onChange={(e) => updateUpperBody('chest', e.target.value)}
              placeholder="e.g., 40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-waist">{t('waist')}</Label>
            <Input
              id="upper-waist"
              value={upperBody.waist}
              onChange={(e) => updateUpperBody('waist', e.target.value)}
              placeholder="e.g., 36"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-seat">{t('seat')}</Label>
            <Input
              id="upper-seat"
              value={upperBody.seat}
              onChange={(e) => updateUpperBody('seat', e.target.value)}
              placeholder="e.g., 38"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-front">{t('front')}</Label>
            <Input
              id="upper-front"
              value={upperBody.front}
              onChange={(e) => updateUpperBody('front', e.target.value)}
              placeholder="e.g., 18"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-shoulder">{t('shoulder')}</Label>
            <Input
              id="upper-shoulder"
              value={upperBody.shoulder}
              onChange={(e) => updateUpperBody('shoulder', e.target.value)}
              placeholder="e.g., 17"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-fullHandCuff">{t('fullHandCuff')}</Label>
            <Input
              id="upper-fullHandCuff"
              value={upperBody.fullHandCuff}
              onChange={(e) => updateUpperBody('fullHandCuff', e.target.value)}
              placeholder="e.g., 24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-halfHandLength">{t('halfHandLength')}</Label>
            <Input
              id="upper-halfHandLength"
              value={upperBody.halfHandLength}
              onChange={(e) => updateUpperBody('halfHandLength', e.target.value)}
              placeholder="e.g., 12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-collar">{t('collar')}</Label>
            <Input
              id="upper-collar"
              value={upperBody.collar}
              onChange={(e) => updateUpperBody('collar', e.target.value)}
              placeholder="e.g., 15"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-cutFront">{t('cutFront')}</Label>
            <Input
              id="upper-cutFront"
              value={upperBody.cutFront}
              onChange={(e) => updateUpperBody('cutFront', e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upper-style">{t('style')}</Label>
            <Input
              id="upper-style"
              value={upperBody.style}
              onChange={(e) => updateUpperBody('style', e.target.value)}
              placeholder="e.g., Regular"
            />
          </div>
        </div>
      </div>
      
      {/* Lower Body */}
      <div className="space-y-4">
        <h3 className="font-semibold text-base text-muted-foreground">{t('lowerBodyMeasurements')}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="lower-length">{t('length')}</Label>
            <Input
              id="lower-length"
              value={lowerBody.length}
              onChange={(e) => updateLowerBody('length', e.target.value)}
              placeholder="e.g., 40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-bottom">{t('bottom')}</Label>
            <Input
              id="lower-bottom"
              value={lowerBody.bottom}
              onChange={(e) => updateLowerBody('bottom', e.target.value)}
              placeholder="e.g., 16"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-thigh">{t('thigh')}</Label>
            <Input
              id="lower-thigh"
              value={lowerBody.thigh}
              onChange={(e) => updateLowerBody('thigh', e.target.value)}
              placeholder="e.g., 24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-knee">{t('knee')}</Label>
            <Input
              id="lower-knee"
              value={lowerBody.knee}
              onChange={(e) => updateLowerBody('knee', e.target.value)}
              placeholder="e.g., 18"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-seat">{t('seat')}</Label>
            <Input
              id="lower-seat"
              value={lowerBody.seat}
              onChange={(e) => updateLowerBody('seat', e.target.value)}
              placeholder="e.g., 40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-mode">{t('mode')}</Label>
            <Input
              id="lower-mode"
              value={lowerBody.mode}
              onChange={(e) => updateLowerBody('mode', e.target.value)}
              placeholder="e.g., Slim"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-frontRiseBackRise">{t('frontRiseBackRise')}</Label>
            <Input
              id="lower-frontRiseBackRise"
              value={lowerBody.frontRiseBackRise}
              onChange={(e) => updateLowerBody('frontRiseBackRise', e.target.value)}
              placeholder="e.g., 12/14"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-bottomWidth">{t('bottomWidth')}</Label>
            <Input
              id="lower-bottomWidth"
              value={lowerBody.bottomWidth}
              onChange={(e) => updateLowerBody('bottomWidth', e.target.value)}
              placeholder="e.g., 16"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lower-waistHeight">{t('waistHeight')}</Label>
            <Input
              id="lower-waistHeight"
              value={lowerBody.waistHeight}
              onChange={(e) => updateLowerBody('waistHeight', e.target.value)}
              placeholder="e.g., 11"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
