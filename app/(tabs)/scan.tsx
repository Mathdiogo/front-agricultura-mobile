import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
  Camera,
  FlipHorizontal,
  Flash,
  X,
  CheckCircle,
  AlertTriangle,
  Leaf,
  MapPin,
  Calendar,
  Upload,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animate cards on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIcon}>
            <Camera size={48} color="#065F46" />
          </View>
          <Text style={styles.permissionTitle}>Acesso à Câmera</Text>
          <Text style={styles.permissionText}>
            Para analisar suas plantas, precisamos acessar a câmera do seu dispositivo
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Permitir Acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // Animate capture
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();

        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedImage(photo.uri);
          setShowCamera(false);
          analyzeImage(photo.uri);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível capturar a imagem');
      }
    }
  };

  const analyzeImage = (imageUri: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          disease: 'Mancha Parda (Alternaria solani)',
          confidence: 89,
          severity: 'Moderada',
          description: 'Doença fúngica comum em tomateiros, caracterizada por manchas escuras nas folhas.',
          treatment: [
            'Remover folhas infectadas',
            'Aplicar fungicida à base de cobre',
            'Melhorar ventilação entre plantas',
            'Evitar irrigação por aspersão'
          ],
          prevention: 'Rotação de culturas e manejo adequado da irrigação',
          color: '#DC2626'
        },
        {
          disease: 'Planta Saudável',
          confidence: 95,
          severity: 'Nenhuma',
          description: 'A planta apresenta sinais de boa saúde, com folhas verdes e vigorosas.',
          treatment: ['Continuar cuidados regulares', 'Manter programa de adubação'],
          prevention: 'Monitoramento regular e boas práticas agrícolas',
          color: '#059669'
        }
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowResult(false);
    setIsAnalyzing(false);
  };

  const handleUploadImage = () => {
    Alert.alert(
      'Upload de Imagem',
      'Esta funcionalidade será implementada em breve. Por enquanto, use a câmera para capturar imagens.',
      [{ text: 'OK' }]
    );
  };

  const renderAnalysisModal = () => (
    <Modal visible={showResult} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Resultado da Análise</Text>
          <TouchableOpacity onPress={() => setShowResult(false)} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {analysisResult && (
          <View style={styles.resultContent}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: capturedImage! }} style={styles.resultImage} />
            </View>

            <View style={styles.diagnosisCard}>
              <View style={styles.diagnosisHeader}>
                <View style={[styles.statusIcon, { backgroundColor: analysisResult.color + '20' }]}>
                  {analysisResult.disease === 'Planta Saudável' ? (
                    <CheckCircle size={24} color={analysisResult.color} />
                  ) : (
                    <AlertTriangle size={24} color={analysisResult.color} />
                  )}
                </View>
                <View style={styles.diagnosisInfo}>
                  <Text style={styles.diseaseName}>{analysisResult.disease}</Text>
                  <Text style={styles.confidence}>
                    Confiança: {analysisResult.confidence}%
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>{analysisResult.description}</Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Leaf size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Severidade: {analysisResult.severity}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{new Date().toLocaleDateString('pt-BR')}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Sorocaba, SP</Text>
                </View>
              </View>

              <View style={styles.treatmentSection}>
                <Text style={styles.treatmentTitle}>Recomendações de Tratamento:</Text>
                {analysisResult.treatment.map((item: string, index: number) => (
                  <Text key={index} style={styles.treatmentItem}>• {item}</Text>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
                <Text style={styles.retakeButtonText}>Nova Análise</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar Resultado</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );

  const renderAnalyzingModal = () => (
    <Modal visible={isAnalyzing} animationType="fade" transparent>
      <View style={styles.analyzingOverlay}>
        <View style={styles.analyzingContainer}>
          <View style={styles.loadingAnimation}>
            <Sparkles size={32} color="#059669" />
          </View>
          <Text style={styles.analyzingText}>Analisando com IA...</Text>
          <Text style={styles.analyzingSubtext}>Identificando possíveis doenças e deficiências</Text>
        </View>
      </View>
    </Modal>
  );

  const renderCamera = () => (
    <Modal visible={showCamera} animationType="slide">
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flashMode}>
          
          {/* Header */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.cameraHeader}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setShowCamera(false)}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.cameraHeaderContent}>
              <Text style={styles.cameraHeaderTitle}>Capturar Planta</Text>
              <Text style={styles.cameraHeaderSubtitle}>Posicione a folha no centro</Text>
            </View>
          </LinearGradient>

          {/* Camera Frame */}
          <View style={styles.cameraFrame}>
            <View style={styles.scanFrame} />
            <Text style={styles.frameText}>Enquadre a parte afetada da planta</Text>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Flash size={24} color={flashMode === 'on' ? '#FCD34D' : '#FFFFFF'} />
            </TouchableOpacity>

            <Animated.View style={[styles.captureButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner}>
                  <Camera size={32} color="#059669" />
                </View>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <FlipHorizontal size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#065F46', '#047857']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Diagnóstico Inteligente</Text>
          <Text style={styles.headerSubtitle}>
            Identifique doenças e deficiências com IA
          </Text>
        </View>
        <View style={styles.headerIcon}>
          <Zap size={28} color="#FFFFFF" />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Como você quer analisar?</Text>
        <Text style={styles.sectionSubtitle}>
          Escolha a melhor forma de capturar sua planta
        </Text>

        <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
          {/* Camera Option */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => setShowCamera(true)}
            activeOpacity={0.9}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View style={styles.optionIconContainer}>
                <Camera size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.optionTitle}>Usar Câmera</Text>
              <Text style={styles.optionDescription}>
                Capture uma foto em tempo real da sua planta
              </Text>
              <View style={styles.optionBadge}>
                <Sparkles size={16} color="#059669" />
                <Text style={styles.optionBadgeText}>Recomendado</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Upload Option */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleUploadImage}
            activeOpacity={0.9}>
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Upload size={40} color="#065F46" />
              </View>
              <Text style={[styles.optionTitle, { color: '#065F46' }]}>Upload de Imagem</Text>
              <Text style={[styles.optionDescription, { color: '#6B7280' }]}>
                Selecione uma foto da galeria do seu dispositivo
              </Text>
              <View style={[styles.optionBadge, { backgroundColor: '#F3F4F6' }]}>
                <Text style={[styles.optionBadgeText, { color: '#6B7280' }]}>Em breve</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Dicas para melhor análise</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Capture em boa iluminação natural</Text>
            <Text style={styles.tipItem}>• Foque na parte afetada da planta</Text>
            <Text style={styles.tipItem}>• Mantenha a câmera estável</Text>
            <Text style={styles.tipItem}>• Evite sombras na imagem</Text>
          </View>
        </View>
      </View>

      {renderCamera()}
      {renderAnalyzingModal()}
      {renderAnalysisModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  headerIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  optionCard: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  optionGradient: {
    padding: 32,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  optionContent: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  optionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  optionBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  tipsSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 16,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    maxWidth: width * 0.9,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  permissionIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F0FDF4',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cameraHeaderContent: {
    flex: 1,
  },
  cameraHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cameraHeaderSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  cameraFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 3,
    borderColor: '#059669',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  frameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  controlButton: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    backgroundColor: '#F0FDF4',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  loadingAnimation: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  analyzingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065F46',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContent: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 16,
  },
  diagnosisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  diagnosisInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  treatmentSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 12,
  },
  treatmentItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});