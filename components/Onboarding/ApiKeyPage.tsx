import React, { useState } from 'react';
import { Key, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { verifyApiKey } from '../../services/geminiService';

interface ApiKeyPageProps {
  currentApiKey: string;
  onSaveApiKey: (key: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

const ApiKeyPage: React.FC<ApiKeyPageProps> = ({
  currentApiKey,
  onSaveApiKey,
  onNext,
  onSkip
}) => {
  const { t } = useTranslation('onboarding');
  const [inputKey, setInputKey] = useState(currentApiKey);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>(
    currentApiKey ? 'success' : 'idle'
  );
  const [verifyMessage, setVerifyMessage] = useState(currentApiKey ? t('apiKey.configured') : '');

  const handleVerifyAndContinue = async () => {
    if (!inputKey.trim()) {
      setVerifyStatus('error');
      setVerifyMessage(t('apiKey.emptyKeyError'));
      return;
    }

    setIsVerifying(true);
    setVerifyStatus('idle');

    try {
      const result = await verifyApiKey(inputKey.trim());

      if (result.success) {
        setVerifyStatus('success');
        setVerifyMessage(t('apiKey.verifySuccess'));
        onSaveApiKey(inputKey.trim());
        // 短暂延迟后进入下一步
        setTimeout(() => {
          onNext();
        }, 500);
      } else {
        setVerifyStatus('error');
        setVerifyMessage(result.message);
      }
    } catch (error: any) {
      setVerifyStatus('error');
      setVerifyMessage(error.message || t('apiKey.verifyError'));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* 图标 */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-300/10 border border-cyan-200/25 flex items-center justify-center">
          <Key className="w-8 h-8 text-cyan-300" />
        </div>
        {verifyStatus === 'success' && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* 标题 */}
      <h2 className="text-2xl font-bold text-white mb-2">
        {t('apiKey.title')}
      </h2>

      {/* 说明 */}
      <p className="text-zinc-500 text-sm mb-6 max-w-xs">
        {t('apiKey.description')}
      </p>

      {/* 输入框 */}
      <div className="w-full max-w-sm mb-4">
        <input
          type="password"
          value={inputKey}
          onChange={(e) => {
            setInputKey(e.target.value);
            setVerifyStatus('idle');
            setVerifyMessage('');
          }}
          placeholder={t('apiKey.placeholder')}
          className="w-full bg-white/[0.06] border border-white/10 text-white px-4 py-3 text-sm rounded-xl focus:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300/10 transition-all font-mono placeholder:text-slate-500 text-center"
          disabled={isVerifying}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputKey.trim() && !isVerifying) {
              handleVerifyAndContinue();
            }
          }}
        />

        {/* 状态提示 */}
        {verifyMessage && (
          <div className={`mt-2 flex items-center justify-center gap-2 text-xs ${
            verifyStatus === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {verifyStatus === 'success' ? (
              <CheckCircle className="w-3.5 h-3.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            {verifyMessage}
          </div>
        )}
      </div>

      {/* 获取 Key 链接 */}
      <div className="flex items-center gap-4 mb-8">
        <a 
          href="https://api.gitcc.com" 
          target="_blank" 
          rel="noreferrer" 
          className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1"
        >
          {t('apiKey.buyNow')} <ExternalLink className="w-3 h-3" />
        </a>
        <span className="text-zinc-700">|</span>
        <a
          href="https://www.gitcc.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1"
        >
          {t('apiKey.consultNow')} <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 主按钮 */}
      <button
        onClick={handleVerifyAndContinue}
        disabled={isVerifying}
        className="px-8 py-3 bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cyan-500/20"
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('apiKey.verifying')}
          </>
        ) : (
          t('apiKey.verifyAndContinue')
        )}
      </button>

      {/* 跳过入口 */}
      <button
        onClick={onSkip}
        className="mt-4 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        {t('apiKey.skip')}
      </button>
    </div>
  );
};

export default ApiKeyPage;
